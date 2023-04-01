import http from 'k6/http';
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    scenarios : {
        shared_iter_scenarios: {
            executor: 'shared-iterations',
            vus: 500,
            iterations: 500,
            starttime: '0s',
        },
        per_vu_scenarios: {
            executor: 'per-vu-iterations',
            vus: 500,
            iterations: 6,
            starttime: '2s',
        },
    },
};

export default function() {
    const res = http.post('https://reqres.in/api/users');
    const payload = JSON.stringify({
        name : 'morpheus',
        job : 'leader'
    });
    const params = {
        headers: {
            'Content-Type' : 'application/json',
        },
    };
    const checkoutput = check(
        res, {
            'response code was 201': (res) => res.status == 201,
        },
    );

    const res2 = http.put('https://reqres.in/api/users/2');
    const payload2 = JSON.stringify({
        name : 'morpheus',
        job : 'zion resident'
    });
    const params2 = {
        headers: {
            'Content-Type' : 'application/json',
        },
    };
    const checkoutput2 = check(
        res2, {
            'response code was 200': (res2) => res2.status == 200,
        },
    );
};

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  };
