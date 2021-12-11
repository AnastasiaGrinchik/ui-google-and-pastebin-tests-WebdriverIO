import { Calculator } from './Calculator.js';
export class CalculatorFactory {
    static getCalculatorForm() {
        let calculatorParametrs = {
            numberOfInstance: '4',
            operatingSystem:
                'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)',
            machineClass: 'Regular',
            series: 'N1',
            machineType: 'n1-standard-8 (vCPUs: 8, RAM: 30GB)',
            gruType: 'NVIDIA Tesla V100',
            numberOfGrus: '1',
            localSsd: '2x375 GB',
            datacenter: 'Frankfurt (europe-west3)',
            commitedUsage: '1 Year',
        };
        return new Calculator(calculatorParametrs);
    }
}

let CalculatorData = CalculatorFactory.getCalculatorForm();
