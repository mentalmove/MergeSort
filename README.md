# MergeSort

**index.html** visualises how *Merge Sort* works in general

**algorithm.js** is a possible Javascript implementation

## Prerequisite
If not already done, the collection has to be converted into a list.  
Therefore, every value is wrapped by an object
that contains, besides the value, a pointer to the object
containing the next value. 

## Basic idea
Merging two well-sorted lists into one has very low costs.  
To do so, the list with the start element
expected to be more left will be the starting point;
the respective next element will be either the next element
in the actual list or the next unregarded element
in the other list.

The original list will be split up in parts of
equal size until the single lists will contain
only one element: These are always well-sorted.  
Each two sorted lists will be joined to one larger sorted list.
