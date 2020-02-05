menu.onclick = () => {
    let x = document.querySelectorAll('#nav-expanded')
    console.log('x: ', x);
    x.forEach(element => {
      if(element.className.indexOf("responsive")){
        let newClass = element.replace(/responsive/g,'');
        element.className = newClass
        //   element.classNames += "responsive"
         
      } else {
        //   element.classNames -= res
        console.log(element.classNames)

      }
    });
}