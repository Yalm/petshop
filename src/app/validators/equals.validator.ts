import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

export function EqualsValidator(controlToCompare: AbstractControl): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
        if (c.value === null || c.value.length === 0) {
            return null;
        }

        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== c.value ? { equals: true } : null;
    };
}
