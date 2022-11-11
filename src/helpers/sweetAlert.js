import Swal from 'sweetalert2'


const Toast = Swal.mixin({
  toast: true,
  position: 'center', // 顯示的位置
  showConfirmButton: false, // 要不要顯示確認按鈕
  timer: 3000, // 顯示時間
  background: "#7DDBB9",
})

export default Toast