const conta = {
    email: 'andrey.info@dio.bank',
    password: '123456',
    name: 'Carlos Andrey',
    balance: 2000.00,
    id: '1'
}

export const api = new Promise((resolve) => {
    setTimeout(() => {
        resolve(conta)
    }, 3000)
})
