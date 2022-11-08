import { useDispatch } from 'react-redux';
import { myPositionActions } from "../store/store";
import Icons from "../assets/images/icons"

function Position() {
  const dispatch = useDispatch()

  // 不同情況dispatch不同type
  const myPositionHandler = () => {
    dispatch(myPositionActions.myPosition())
  }
  return (
    <Icons.SVGPosition onClick={myPositionHandler} />
  );
}


export default Position
