package br.com.eventlog.route

import org.apache.camel.builder.RouteBuilder
import org.apache.camel.model.dataformat.JsonLibrary
import org.springframework.stereotype.Component

@Component
class LogRoute extends RouteBuilder {

    @Override
    void configure() throws Exception {
        from("direct:toLog")
                .marshal()
                .json(JsonLibrary.Jackson)
                .to("rabbitmq://${System.getenv("RABBIT_URL")}:5672/logs?queue=producer.queue&exchangeType=topic&username=admin&password=admin&autoDelete=false")
    }
}
