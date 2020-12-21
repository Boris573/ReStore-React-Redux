const updateCartItems = (cartItems, item, idx) => {

	if (item.count === 0) {
		return [
			...cartItems.slice(0, idx),
			...cartItems.slice(idx+1)
			]
	}

	if (idx === -1) {
		return [
		...cartItems,
		item
		]
	} else {
		return [
		...cartItems.slice(0, idx),
		item,
		...cartItems.slice(idx+1)
		]
	}
}

const updateCartItem = (book, item = {}, deltaCount) => {

	const {
		id = book.id,
		title = book.title,
		count = 0,
		total = 0
	} = item;

	return {
		id,
		title,
		count: count + deltaCount,
		total: total + deltaCount*book.price
	};
} 

const updateOrder = (state, bookId, deltaCount = 0) => {
	const { bookList: {books},shoppingCart: {cartItems} } = state;
	const book = books.find((book) => book.id === bookId);
	const itemIndex = cartItems.findIndex((book) => book.id === bookId);
	const item = cartItems[itemIndex];

	if (deltaCount === 0) deltaCount = -item.count;

	const newItem = updateCartItem(book, item, deltaCount);
	return {
		orderTotal: 0,
		cartItems: updateCartItems(cartItems, newItem, itemIndex)
	}
}

const updateShoppingCart = (state, action) => {

	if (state === undefined) {
		return {
			cartItems: [],
			orderTotal: 0
		}
	}

	switch(action.type) {
		case 'BOOK_ADDED_TO_CART':
			return updateOrder(state, action.payload, 1);

		case 'BOOK_REMOVED_FROM_CART':
			return updateOrder(state, action.payload, -1);

		case 'ALL_BOOKS_REMOVED_FROM_CART':
			return updateOrder(state, action.payload);

		default:
			return state.shoppingCart;
	}
}

export default updateShoppingCart;