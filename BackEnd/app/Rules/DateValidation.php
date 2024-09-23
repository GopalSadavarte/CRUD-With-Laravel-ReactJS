<?php

namespace App\Rules;

use Closure;
use DateTime;
use DateTimeZone;
use Illuminate\Contracts\Validation\ValidationRule;

class DateValidation implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string = null): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $newDate = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
        $old = $newDate->setDate(date('Y') - 18, date('m'), date('d'));
        $date1 = $old->format('Y-m-d');
        if ($value > $date1) {
            $fail(':attribute is must greater than ' . date('Y-m-d') . ' date ');
        }
    }
}
