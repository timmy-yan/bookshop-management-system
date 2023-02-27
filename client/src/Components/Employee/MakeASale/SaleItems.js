import ItemCard from './ItemCard'
import { v4 } from 'uuid'
export default function SaleItems({ isNotSearching, items, setItems, filteredItems, setChange }) {
  
  return (
    <>
      <div className="items-header">
        <h3>Item Name</h3>
        <h3>Make/<br />Publisher</h3>
        <h3>QTY</h3>
        <h3>Price</h3>
      </div>
      {isNotSearching && items && items.some((item) => item.isCartItem) ? (
        <div className="cart-items">
          {items
            .filter((item) => item.isCartItem) .map((item) => (   <ItemCard key={v4()} item={item} setItems={setItems} isDisplayingCart={true}  setChange={setChange} /> ))}
        </div>
      ) : (
        <div className="all-items">
          {items ? (
            filteredItems.map((item) => (<ItemCard key={v4()} item={item} setItems={setItems} isDisplayingCart={false} setChange={setChange}/> ))
          ) : (
            <>No Items c</>
          )}
        </div>
      )}
    </>
  )
}
