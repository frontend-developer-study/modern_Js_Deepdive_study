export class ContentLayouts extends template.DivObjects {
  constructor() {}
  fun = () => {
    this.click_guide_problem_count = document.createElement("input");

    this.click_guide_problem_count.onkeyup = removeChar;

    function removeChar(event) {
      event = event || window.event;
      var keyID = event.which ? event.which : event.keyCode;
      if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39) return;
      else event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }

    // 문제 수 초과 입력 제어
    let problems = this;
    $(document).on("keyup", "input[name^=problem_count_name]", function () {
      var val = Number($(this).val());
      problems.click_guide_problem_count.oninput =
        "this.value = this.value.replace(/[^0-9.]/g, '').replace(/(..*)./g, '$1');";
      if (val == 0) {
        alert("출제 가능한 문제 수를 입력하세요.");
        $(this).val(problems.click_guide_problem_count.min);
      } else if (val > problems.click_guide_problem_count.max) {
        alert("출제 가능한 문제 수를 초과하였습니다.");
        $(this).val(problems.click_guide_problem_count.max);
      }

      if (parseInt(problems.click_guide_problem_count.value) == 1) {
        problems.timer_input_box.value = Math.ceil(
          parseInt(problems.click_guide_problem_count.value) / 3
        );
      } else {
        problems.timer_input_box.value = Math.round(
          parseInt(problems.click_guide_problem_count.value) / 3
        );
      }
      problems.makeflag = 0;
    });
  };
}

let value = 1;
const obj = {
  value: 100,
  foo() {
    const that = this;
    setTimeout(function () {
      console.log(that.value);
    }, 100);
  },
};
const obj2 = {
  value: 100,
  foo() {
    setTimeout(
      function () {
        console.log(this.value);
      }.bind(this),
      100
    );
  },
};
const obj3 = {
  value: 100,
  foo() {
    setTimeout(() => {
      console.log(this.value);
    }, 100);
  },
};
// bind() 메소드가 호출되면 새로운 함수를 생성합니다. 받게되는 첫 인자의 value로는 this 키워드를 설정하고, 이어지는 인자들은 바인드된 함수의 인수에 제공됩니다.

const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
