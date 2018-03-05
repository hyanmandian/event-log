package br.com.eventlog.api

import org.apache.camel.ProducerTemplate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class LogApi {

    @Autowired
    private ProducerTemplate producerTemplate;

    @PostMapping("/transaction")
    TransactionDTO newTransaction(@RequestBody TransactionDTO transaction) {
        producerTemplate.sendBody('direct:toLog', transaction)
        return transaction;
    }

}

class TransactionDTO {

    private String nome
    private String email
    private Integer agencia
    private Integer conta
    private Integer cpfCnpj
    private Integer celular
    private String servico
    private String message
    private Date createdAt

    String getNome() {
        return nome
    }

    void setNome(String nome) {
        this.nome = nome
    }

    String getEmail() {
        return email
    }

    void setEmail(String email) {
        this.email = email
    }

    Integer getAgencia() {
        return agencia
    }

    void setAgencia(Integer agencia) {
        this.agencia = agencia
    }

    Integer getConta() {
        return conta
    }

    void setConta(Integer conta) {
        this.conta = conta
    }

    Integer getCpfCnpj() {
        return cpfCnpj
    }

    void setCpfCnpj(Integer cpfCnpj) {
        this.cpfCnpj = cpfCnpj
    }

    Integer getCelular() {
        return celular
    }

    void setCelular(Integer celular) {
        this.celular = celular
    }

    String getServico() {
        return servico
    }

    void setServico(String service) {
        this.servico = service
    }

    String getMessage() {
        return message
    }

    void setMessage(String message) {
        this.message = message
    }

    Date getCreatedAt() {
        return createdAt
    }

    void setCreatedAt(Date createAt) {
        this.createdAt = createAt
    }
}
