import stockConfig from "../stockExchange/stockConfig.js";

export function setupSocket(io) {
    const interval = setInterval(() => {
        const data = stockConfig.getCryptoData()
        io.emit('updateData', data);
    },1000)
    io.on('connection', (socket) => {
        console.log('user connected', socket.id);

        socket.on('disconnect', () => {
            console.log('disconnect', socket.id);
        });
    });
}