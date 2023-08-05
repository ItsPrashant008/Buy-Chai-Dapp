import { useState, useEffect } from "react";
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);

  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };

    contract && memosMessage();
  }, [contract]);

  return (
    <>
      <p>Messages</p>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Message</th>
            <th scope="col">From</th>
          </tr>
        </thead>
        {memos.map((memo) => {
          return (
            <tbody key={memo.timestamp}>
              <tr>
                <td>{memo.name}</td>
                <td>{new Date(memo.timestamp * 1000).toLocaleString()}</td>
                <td>{memo.message}</td>
                <td>{memo.from}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default Memos;
