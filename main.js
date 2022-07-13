// 로직
// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가
// delete버튼을 누르면, 할일이 삭제
// Check버튼을 누르면 할일이 끝나면서 밑줄 생성
// 1. check버튼을 클리하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false이면 안끝난걸로 간주하고 그대로

// not done, done 버튼을 누르면, 언더바 이동
// done탭은 끝난 아이템만 / not done탭은 진행중인 아이템만 보인다
// all 탭을 누르면 다시 전체 아이템으로 돌아온다


let taskInput = document.getElementById('task-input')
let addBtn = document.getElementById('add-btn')
let tabs = document.querySelectorAll('.task-tabs div')
let taskList = []
let mode = 'all'
let filterList = []

addBtn.addEventListener('click', addTask)
taskInput.addEventListener('click', () => {taskInput.value = ''})


for(let i=1; i<tabs.length; i++) {
  tabs[i].addEventListener('click', (event) => {filter(event)})
}

function addTask() {
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task)
  console.log(taskList)
  render()
}

function render() {
  let list = []
  if(mode == 'all') {
    list = taskList
  } else if(mode == 'on-going' || mode == 'done') {
    list = filterList
  } 

  let resultHtml = ''
  for(let i=0;i<list.length;i++) {
    if(list[i].isComplete == true) {
      resultHtml += `<div class="task"> 
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`
    } else {
      resultHtml += `<div class="task"> 
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`
    }

  }

  document.getElementById('task-board').innerHTML = resultHtml
}


function toggleComplete(id) {
  console.log('id:', id)
  for(let i=0; i<taskList.length;i++){
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete
      break
    }
  }
  render()
  console.log(taskList)
}

function deleteTask(id) {
  for(let i=0; i<taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(i, 1)
      break
    }
  }
  render()
}

function filter(event) {
  mode = event.target.id
  filterList = []

  document.getElementById('under-line').style.width = 
    event.target.offsetWidth + 'px'
    document.getElementById('under-line').style.top = 
    event.target.offsetTop + event.target.offsetHeight + 'px'
    document.getElementById('under-line').style.left = 
      event.target.offsetLeft + 'px'

  if(mode == 'all') {
    render()
  } else if(mode == 'on-going') {
    for(let i =0; i<taskList.length; i++){
      if(taskList[i].isComplete == false) {
        filterList.push(taskList[i])
      }
    }
    render()
  }
  else if(mode == 'done') {
    for(let i =0; i<taskList.length; i++){
      if(taskList[i].isComplete == true) {
        filterList.push(taskList[i])
      }
    }
    render()
  }
}

function randomIdGenerate() {
  return '_' + Math.random().toString(36).substring(2, 9)
}