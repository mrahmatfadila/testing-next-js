import Link from "next/link"
import styles from "./Login.module.scss"
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {push, query} = useRouter()

    const callbackUrl: any = query.callbackUrl || '/';
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            // jika gaada error
            if(!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setError("Email or password is incorrect")
            }
        }catch (error: any) {
            setIsLoading(false);
            // setError(error); akan muncul CredentialsSignin, setError("Email or password is incorrect"); akan muncul Email or password is incorrect
            setError("Email or password is incorrect");
        }
    }
    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.login__form__item}>
                        <label htmlFor="email" className={styles.login__form__item__label}>Email</label>
                        <input type="email" name="email" id="email" placeholder="example@email.com" className={styles.login__form__item__input}/>
                    </div>

                    <div className={styles.login__form__item}>
                        <label htmlFor="password" className={styles.login__form__item__label}>Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className={styles.login__form__item__input}/>
                    </div>
                    <button type="submit" className={styles.login__form__item__button} disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
                    </form>
                    <button onClick={() => signIn("google", {
                        callbackUrl,
                        redirect: false
                    })} className={styles.login__form__item__google}>Sign In With Google</button>
                    
                    <p className={styles.login__link}>
                        Don{"'"}t have an account? Sign up <Link href="/auth/register">here</Link>
                    </p>
            </div>
        </div>
    )
}

export default LoginView;