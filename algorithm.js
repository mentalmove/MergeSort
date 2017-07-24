var AMOUNT = 10;                                                                // How many elements?
var LIMIT = 15;                                                                 // All elements have non-negative integer values below LIMIT

/**
 * For creation of collection without duplicates,
 * refer to 'create_indices()' on main page
 */
function create_random_array (amount, limit) {
    var a = [];
    for ( var i = 0; i < amount; i++ )
        a.push( Math.floor(Math.random() * limit) );
    return a;
}
/**
 * Value is wrapped by an object with two properties:
 *      - the value
 *      - a pointer to another object; initially NULL
 */
function create_container (value) {
    var tmp = {};
    tmp.value = value;
    tmp.next = null;
    return tmp;
}
/**
 * Return value is only one element
 * (but this is connected with the rest)
 * 
 * @returns Object
 */
function array_to_list (values) {
    var first = create_container(values[0]);
    var tmp = first;
    var next;
    for ( var i = 1; i < values.length; i++ ) {
        next = create_container(values[i]);
        tmp.next = next;
        tmp = next;
    }
    return first;
}
/**
 * Creates new Array and fills it with values from list
 */
function list_to_array (first) {
    var a = [ first.value ];
    var tmp = first.next;
    while ( tmp ) {
        a.push(tmp.value);
        tmp = tmp.next;
    }
    return a;
}
/**
 * Takes two well-sorted lists; returns one well-sorted list
 * 
 * Technique is probably inspired by (or at least similar to) a zipper
 */
function merge (first, second) {
    var to_return, alternative, tmp_alternative;
    /**
     * Since both lists are sorted, the overall return value
     * must be the lower of first and second
     */
    if ( first.value <= second.value ) {
        to_return = first;
        alternative = second;
    }
    else {
        to_return = second;
        alternative = first;
    }
    /**
     * Pointer to first element; will move in the following
     */
    var tmp = to_return;
    /**
     * No more alternative element (one of the lists is empty):
     * Stop. Remaining elements are connected and sorted 
     */
    while ( alternative ) {
        /**
         * Is there a next element, and is it better than 'alternative'?
         * Then move right...
         */
        while ( tmp.next && (!alternative || tmp.next.value <= alternative.value) )
            tmp = tmp.next;
        /**
         * ...otherwise, swap 'tmp' and 'alternative'
         */
        tmp_alternative = tmp.next;
        tmp.next = alternative;
        tmp = alternative;
        alternative = tmp_alternative;
    }
    /**
     * List is necessarily sorted now
     */
    return to_return;
}
/**
 * Takes one (probably unsorted) list; returns a well-sorted list
 */
function merge_sort (first, amount) {
    /**
     * A list containing only one element is always well-sorted
     * Amazingly, this assertion guarantees
     * that no sort actions are necessary at all
     */
    if ( !first.next )
        return first;
    /**
     * Divide the given list into two separate lists
     * of the same size. Used technique is unimportant
     */
    var first_amount = Math.ceil( amount / 2 );
    var second_amount = amount - first_amount;
    var counter = 1;
    var tmp = first;
    while ( counter < first_amount ) {
        tmp = tmp.next;
        counter++;
    }
    var second = tmp.next;
    tmp.next = null;
    /**
     * The function promises to return a well-sorted list;
     * that should also apply to the both newly generated ones
     */
    first = merge_sort(first, first_amount);
    second = merge_sort(second, second_amount);
    /**
     * Join the two sorted lists into one
     */
    var merged = merge(first, second);
    
    return merged;
}

/**
 * Some random values
 */
var unsorted_array = create_random_array(AMOUNT, LIMIT);
/**
 * Conversion into a list is mandatory
 */
var originally_first = array_to_list(unsorted_array);

console.log( unsorted_array );

/**
 * The whole job
 */
var first_after_sort = merge_sort(originally_first, AMOUNT);

/**
 * Conversion again for easy display
 */
var sorted_array = list_to_array(first_after_sort);
console.log( sorted_array );
