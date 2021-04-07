const body = document.querySelector('body');
const boxes = document.querySelectorAll('.col');
const winner_div = document.querySelector('.winner');
const restart_btn = document.querySelector('button');
const winner_header = document.querySelector('.winner h1')
const winning_positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let flag = true;


//handles the mouseenter event listener by adding a hover-specific styling class corresponding to the player's turn
const box_on_hover = (e) => {
  const box = e.target;
  if (!class_exists(box)) {
    box.classList.add(box_mouse_action('hover'));
  }
}

//handles the mouseout event listener by removing the hover-specific styling class that was added on hovering
const box_out_hover = (e) => {
  const box = e.target;
  box.classList.remove(box_mouse_action('hover'));
}

//handles the click event listener by adding a click-specific styling class corresponding to the player's turn and the swaps
//it also checks whether a win or draw were reached and handles them accordingly using the win & draw functions
const box_on_click = (e) => {
  const box = e.target;
  if (!class_exists(box)) {
    box.classList.remove(box_mouse_action('hover'));
    box.classList.add(box_mouse_action('click'));
    flag = !flag;
    const winner = win();
    const draw_state = draw();
    `${winner} Wins!!`
    if (winner) {
      game_end(`${win()} Wins!!`);
    }
    else if(draw_state){
      game_end(`Draw!!`)
    }
  }
}

//adds the initial game event listeners using the previously defined functions
const game_start = () => {
  boxes.forEach(box => {
    box.addEventListener('mouseenter', box_on_hover)
    box.addEventListener('mouseleave', box_out_hover)
    box.addEventListener('click', box_on_click)
  })
}

//selects the class name to be added on hover or click( X or O) based on a global bolean flag and the action name
const box_mouse_action = (action) => {
  let class_name;
  if(flag){
    class_name = action === 'hover'? 'add-x-image' :'x-image';
  }
  else{
    class_name = action === 'hover' ? 'add-o-image' : 'o-image';
  }
  return class_name;
}


//checks whether a box has a click class or not and if it does returns true
function class_exists(item){
  const classes = [...item.classList];
  return classes.includes("o-image") || classes.includes("x-image");
}


//checks whether one of the two players formed a winning pattern and returns X, O, or false, based on the case
const win = () => {
  
  //takes a class_name and returns true if at least one of the winning positions matches that of the player with the given class name
  const pass_winning_patterns = (class_name) => {
    //takes an array of positions and a class name and returns true if every one of the boxes at those positions has the same class as the given class name
    const pass_winning_pattern = (arr_of_positions, class_name) => {
      const boxes_arr = [...boxes];
      return arr_of_positions.every(index => [...boxes_arr[index].classList].includes(class_name))
    }
    return winning_positions.some(arr_of_positions => pass_winning_pattern(arr_of_positions, class_name))
  }

  const x_win = pass_winning_patterns('x-image');
  const o_win = pass_winning_patterns('o-image');
  return x_win? 'X' : o_win? 'O' : false;
}


//returns true if every box has either of the two game classes, namely, x-image & o-image
const draw = () => {
  return [...boxes].every(box => class_exists(box))
}

//removes the initially set-up event listeners, brings up the end-game screen, and adds the restart button on-click functionality 
const game_end = (msg) => {
  winner_header.textContent = msg;
  winner_div.style.display = 'block';
  body.classList.add('style');
  restart_btn.addEventListener('click', restart);
  boxes.forEach(box => {
    box.removeEventListener('mouseenter', box_on_hover);
    box.removeEventListener('mouseleave', box_out_hover);
    box.removeEventListener('click', box_on_click);
  })

}

//resets all settings to start the game anew
const restart = () => {
  boxes.forEach(box => {
    box.classList.remove('x-image');
    box.classList.remove('o-image');
  })
  winner_div.style.display = 'none';
  body.classList.remove('style');
  game_start();
}


game_start();
