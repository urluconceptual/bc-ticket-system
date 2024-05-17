import { ethers } from "ethers";

import close from "../assets/close.svg";

const Product = ({ ticket, provider, account, ticketsContract, togglePop }) => {
  const buyHandler = async () => {
    try {
      const signer = provider.getSigner();
      const transaction = await ticketsContract.connect(signer).buy(ticket.id, { value: ticket.price });
      await transaction.wait();
    } catch (error) {
      console.error("Error buying ticket:", error);
    }
  };

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__overview">
          <h1>{ticket.name}</h1>
          <hr />
          <p>{ticket.address}</p>
          <h2>
            {ethers.utils.formatUnits(ticket.price.toString(), "ether")} ETH
          </h2>
          <hr />
        </div>
        <div className="product__order">
          <h1>
            {ethers.utils.formatUnits(ticket.price.toString(), "ether")} ETH
          </h1>
          {ticket.stock > 0 ? <p>In Stock.</p> : <p>Out of Stock.</p>}
          <button className="product__buy" onClick={buyHandler}>
            Buy Now
          </button>
        </div>
        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default Product;
