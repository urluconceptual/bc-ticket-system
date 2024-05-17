import { ethers } from 'ethers'

const Section = ({ title, items, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>
            <hr/>

            <div className='cards'>
                { items.map((ticket, index) => (
                  <div className='card' key={index} onClick = {() => {togglePop(ticket)}}>
                    <div className='card__info'>
                        <h4>{ticket.name}</h4>
                        <p>{ethers.utils.formatUnits(ticket.price.toString(), 'ether')} ETH</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
    );
}

export default Section;
