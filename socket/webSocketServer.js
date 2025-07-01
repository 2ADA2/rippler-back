import stockConfig from "../stockExchange/stockConfig.js";

export function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('user connected', socket.id);

        socket.on('getData', () => {
            const data = stockConfig.getCryptoData()
            io.emit('updateData', data);
        });

        socket.on('disconnect', () => {
            console.log('', socket.id);
        });
    });
}