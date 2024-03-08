export const DefaultAuthOptions = {
    createOptions: {
        idleOptions: {
            disableIdle: true,
        },
    },
    loginOptions: {
        identityProvider:
            process.env.DFX_NETWORK === "ic"
                ? "https://identity.ic0.app/#authorize"
                : `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:4943#authorize`,
    },
}