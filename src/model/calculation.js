
// (originalPrice * (discountPercentage / 100))
exports.calculateTotalTax = async function calculateTotalTax(data) {

    const totalTax = await data.reduce(
        (acc, value) => acc + value.price * (value.tax / 100) * value.quantity, 0);
    return totalTax;
}


exports.calculateTotalDiscount = async function calculateTotalDiscount(data) {
    const totalDiscount = await data.reduce((acc, value) => {

        return acc + value.price * (value.discount / 100) * value.quantity
    }, 0)

    return totalDiscount;
}


exports.calculateSubTotal = async function calculateSubTotal(data) {
    const totalSubTotal = await data.reduce(
        (acc, value) => acc + value.price * value.quantity,
        0
    );
    return totalSubTotal;
}


exports.calculateTotal = async function calculateTotal(
    tax,
    discount,
    subTotal
) {
    return tax + subTotal - discount;
}

//grandTotal
exports.grandTotal = async function grandTotal(
    totalDiscount, totaltax, totalSubTotal
) {
    return (totaltax + totalSubTotal) - totalDiscount;

}

