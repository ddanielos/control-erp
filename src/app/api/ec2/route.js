import { NextResponse } from "next/server";

const end_point_status_ec2 = process.env.END_POINT_STATUS_EC2;
const end_point_start_ec2 = process.env.END_POINT_START_EC2;
const end_point_stop_ec2 = process.env.END_POINT_STOP_EC2;


async function getEC2Status(){
    try {
        const response = await fetch(end_point_status_ec2)
        const data = await response.json();
        return data.instanceState
    } catch (error) {
        console.error('Error al obtener el estado del servidor:', error);
        return 'No se puede obtener el estado'
    }
}

async function startEC2(){
    try {
        const response = await fetch(end_point_start_ec2,{
            method: 'POST',            
        });
        const data = await response.json();
        console.log("data:",data)
        return { success: true, message: data.message || 'Servidor iniciado'}
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        return { success: false, message: 'Error al iniciar el servidor'}
    }
}

async function stopEC2(){
    try {
        const response = await fetch(end_point_stop_ec2,{
            method: 'POST',            
        });
        const data = await response.json();
        console.log("data:",data)
        return { success: true, message: data.message || 'Servidor detenido'}
    } catch (error) {
        console.error('Error al detener el servidor:', error);
        return { success: false, message: 'Error al detener el servidor'}
    }
}

export async function GET(){
    const status = await getEC2Status();
    return NextResponse.json({ status })
}

export async function POST(request){
    const { action } = await request.json();
    if ( action === 'start' ){
        const result = await startEC2();
        return NextResponse.json(result);
    } else if ( action === 'stop' ){
        const result = await stopEC2();
        return NextResponse.json(result);
    } else {
        return NextResponse.json({ success: false, message: 'Acción no valida' }, { status: 400 })
    }
}