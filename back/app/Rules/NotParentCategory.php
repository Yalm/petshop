<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Category;

class NotParentCategory implements Rule
{

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $category = Category::find($value);
        return $category->parent_id == null ? false : true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute is not parent.';
    }
}
