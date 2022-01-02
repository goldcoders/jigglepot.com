export function validateEmail(email: unknown) {
    if (typeof email !== "string" || !(email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/))) {
        return `Please Enter Valid Email`
    }
}

export function validatePassword(password: unknown) {

    if (typeof password !== "string" || !(password.match(/(?=.{10,})/))) {
        return `Password should be at least 10 characters`;

    }
    if (typeof password !== "string" || !(password.match(/(?=.*[A-Z])/))) {
        return `Password should have at least one uppercase letter`;

    }
    if (typeof password !== "string" || !(password.match(/(?=.*[a-z])/))) {
        return `Password should have at least one lowercase letter`;

    }
    if (typeof password !== "string" || !(password.match(/(?=.*[0-9])/))) {
        return `Password should have at least one number`;

    }
    if (typeof password !== "string" || !(password.match(/([^A-Za-z0-9])/))) {
        return `Password should have at least one special character`;
    }
}