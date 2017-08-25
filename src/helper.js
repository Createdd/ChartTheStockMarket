import * as toastr from 'toastr';

export const calculateTicks = (dates,ind) => {
  const tick = Math.floor(dates.length / 10);
  const tickValues = [];
  for (var j = 0; j < dates.length; j = j + tick) {
    tickValues.push(dates[j]);
  }
  return tickValues;
}

export const toastOptions = toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
