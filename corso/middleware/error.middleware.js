const errorMiddleware = (err, req, res, next) => {
    if (err.status >= 400 && err.status <= 499) {
        res.status(err.status).json({ error: err.message });
    } else {
        console.error(err.stack);

        res.status(500).json({ error: 'Qualcosa è andato storto!' });
    }
};

export default errorMiddleware;