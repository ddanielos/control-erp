import { redirect } from "next/navigation";
import { signIn, signOut, confirmSignIn } from "aws-amplify/auth"
import { getErrorMessage } from "@/utils/get-error-message"

export async function handleSignUp(prevState, formData) {
    console.log("signing up");
    return "Error creating an account";
}
  
export async function confirmSignUp(prevState, formData) {
    console.log("confirming sign up");
    return "Invalid code";
}
  
export async function handleSignIn(prevState, formData) {
  let redirectLink = "/dashboard";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      redirectLink = "/";
      alert("No se validó el email, póngase en contacto con el administrador")
    }
    if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
      const { isSignedIn, nextStep } = await confirmSignIn({
        challengeResponse: "N@ti2021",
        options: {
          clientMetadata: {
            source: "web"
          },
          friendlyDeviceName: "Mi laptop"
        }
      })
    }

  } catch (error) {
    return getErrorMessage(error);
  }
  redirect(redirectLink);
}
  
export async function handleSignOut() {
  try {
    await signOut();
    return { success: true }
  } catch (error) {
    console.log(getErrorMessage(error));
    return { success: false, error: getErrorMessage(error) }
  }
}
  