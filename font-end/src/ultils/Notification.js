
export const onSuccess = () => {
    return (
        <Alert variant="filled" severity="success"
            sx={{
                width: "200px",
                position: 'absolute',
                backgroundColor: "red",
                zIndex: 9999,
            }}
            message=""
        >
            Something went wrong
        </Alert>
    )
}

export const onError = () => {
    return (
        <Alert variant="filled" severity="error"
            sx={{
                width: "90%",
                position: 'absolute',
                height: '159px',
                backgroundColor: "red"
            }}
        >
            Something went wrong
        </Alert>
    )
}
