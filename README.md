# Event Logs
> Minor POC to test event logs and reactive services

## Producer

Just produce a message!
```json
// Hit http://localhost:8080/transaction
{
	"nome": "Alex",
	"email": "test@email.com",
	"agencia": 123,
	"conta": 987,
	"cpfCnpj": 234,
	"celular": 12345,
	"servico": "Teste!",
	"message": "essa mensagem é um test",
	"createdAt": "2018-03-02T22:38:43.801"
}
```

## Consumer

Listen to MQ, save the log in MongoDB and implements [JSON API](http://jsonapi.org/).
For example, if you want to filter by `servico`, you just need to add `filter[servico]` query param with the value that you need.

```json
// Hit http://localhost:3000/transactions?filter[servico]=Teste!
{
	...,
	data: {
		"nome": "Alex",
		"email": "test@email.com",
		"agencia": 123,
		"conta": 987,
		"cpfCnpj": 234,
		"celular": 12345,
		"servico": "Teste!",
		"message": "essa mensagem é um test",
		"createdAt": "2018-03-02T22:38:43.801"
	}
	...,
}
```

## Meta

Alex Rocha - [about.me](http://about.me/alex.rochas)
Hyan Mandian
