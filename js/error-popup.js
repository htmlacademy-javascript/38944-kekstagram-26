const renderErrorPopup = () => {
  const errorPopup = document.createElement('div');
  errorPopup.textContent = 'Произошёл технический сбой. Пожалуйста попробуйте позже.';
  errorPopup.style.position = 'fixed';
  errorPopup.style.height = '200px';
  errorPopup.style.width = '100%';
  errorPopup.style.top = '50%';
  errorPopup.style.left = '50%';
  errorPopup.style.transform = 'translate(-50%, -50%)';
  errorPopup.style.backgroundColor = 'red';
  errorPopup.style.fontSize = '16px';
  errorPopup.style.textAlign = 'center';
  errorPopup.style.padding = '85px';
  document.body.append(errorPopup);
};

export {renderErrorPopup};
