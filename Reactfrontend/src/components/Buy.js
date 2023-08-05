import { ethers } from "ethers";

const Buy = ({ state }) => {
    const buyItem = async (e) => {
        e.preventDefault();
        const { contract } = state;
        const fullName = document.querySelector("#fullName").value;
        const message = document.querySelector("#message").value;

        console.log(fullName, message, contract);

        const amount = {value: ethers.utils.parseEther("0.001")}

        const transaction = await contract.buyItem(fullName, message, amount);
        await transaction.wait();

        console.log("Transaction is done;");
    }

    return <>
        <form onSubmit={buyItem}>
            <label>Full Name: </label>
            <input type="text" name="fullName" id="fullName" placeholder="Enter your Full Name"></input>

            <br></br>
            <br></br>
            <label>Message: </label>
            <input type="text" name="message" id="message" placeholder="Enter your Message"></input>

            <br></br>
            <br></br>
            <input type="submit" value="Pay" disabled={!state.contract}></input>
        </form>
    </>
}

export default Buy;