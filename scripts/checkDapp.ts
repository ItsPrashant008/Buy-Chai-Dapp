import { ethers } from "hardhat";

async function getBalances(address: string | Promise<string>) {
    const balanceBigInt = await ethers.provider.getBalance(address);
    return ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalance(addresses: string[]) {
    let counter = 0;
    for (const address of addresses) {
        console.log(`Address ${counter} balance: `, await getBalances(address));
        counter++;
    }
}

async function consoleMemos(memos: any) {
    for (const memo of memos) {
        const name = memo.name;
        const timestamp = memo.timestamp;
        const message = memo.message;
        const from = memo.from;
        console.log(`Name: ${name}, Timestamp: ${timestamp}, Message: ${message}, From: ${from}`);
    }
}

async function main() {

    const [owner, user1, user2, user3] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Dapp");
    const token = await Token.deploy();

    await token.deployed();
    console.log("Contract Address-> ", token.address);

    const addresses = [owner.address, user1.address, user2.address, user3.address];
    console.log("Before Call Contract");
    await consoleBalance(addresses);

    const amount = { value: ethers.utils.parseEther("1") }
    await token.connect(user1).buyItem("Akshay", "Working Good!", amount);
    await token.connect(user2).buyItem("Akshay", "Yeahhhhh!", amount);
    await token.connect(user3).buyItem("Akshay", "Thats work!", amount);

    console.log("After Call Contract");
    await consoleBalance(addresses);

    const memos = await token.getMemos();
    consoleMemos(memos)
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log('Deploy error-> ', error); process.exit(1);
    });