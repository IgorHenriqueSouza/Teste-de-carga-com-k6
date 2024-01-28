import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 10, //Usuarios simultaneos
  duration: "60s", // Por quanto tempo os usuarios vão fazer requisições
  thresholds: {
    http_req_failed: ["rate<0.01"], // Taxa de erro tem que ser menor do que 0.01
    http_req_duration: ["p(95)<200"], // 95% das requisições tem que ter no maximo 200ms
  },
};

export default function () {
  /*
    Podemos passar um body para a aplicação caso necessite
    let data = {
        name:'',
        email:'',
        document:''
    }*/
  http.get("https://jsonplaceholder.typicode.com/todos/1");
}

//gerando um relatorio do teste
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
