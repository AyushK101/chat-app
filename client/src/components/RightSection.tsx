import MessageBlock from "./MessageBlock"

const RightSection = () => {
  return (
    <>
    <div className="flex justify-center items-center h-full">
      <MessageBlock/>
      {
              // eslint-disable-next-line no-constant-condition, no-constant-binary-expression
              true == false ? "no chat selected" : ""
            }
    </div>
      
    </>
  )
}

export default RightSection