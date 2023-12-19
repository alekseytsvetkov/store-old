import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@store/ui';
import Qiwi from '../assets/qiwi.svg';
import Sbp from '../assets/sbp.svg';
import Visa from '../assets/visa.svg';
import Mastercard from '../assets/mastercard.svg';
import Image from 'next/image';

const PAYMENT_METHODS = [
  {
    name: 'СБП',
    code: 'sbp',
    image: Sbp,
  },
  {
    name: 'Mastercard',
    code: 'mastercard',
    image: Mastercard,
  },
  {
    name: 'Visa',
    code: 'visa',
    image: Visa,
  },
  {
    name: 'Qiwi',
    code: 'qiwi',
    image: Qiwi,
  },
];

export function PaymentMethodSwitcher() {
  const onValueChange = (newPaymentMethod: string) => {
    console.log('newPaymentMethod');
  };

  return (
    <Select onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger id="area">
        <SelectValue placeholder="Not selected" />
      </SelectTrigger>
      <SelectContent>
        {PAYMENT_METHODS.map((paymentMethod) => (
          <SelectItem key={paymentMethod.code} value={paymentMethod.code}>
            <div className="flex flex-row items-center">
              <Image
                src={paymentMethod.image}
                alt={paymentMethod.name}
                height={18}
                width={26}
                className="mr-2 rounded"
              />
              <span>{paymentMethod.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
