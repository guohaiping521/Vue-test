// // 【题目】字符串中只有字符'('和')'。合法字符串需要括号可以配对。比如：
// // 输入："()"
// // 输出：true
// // 解释：()，()()，(())是合法的。)(，()(，(()是非法的。
// // 请你实现一个函数，来判断给定的字符串是否合法。
// //boolean isValid(String s);
import java.util.Stack;
class QuickStart {
    public static void main(String[] args) {
        System.out.println("开始了----");
        System.out.println(isValid("()"));
        System.out.println(isValid("(())))"));
    }
    static boolean isValid(String s) {
      if (s == null || s.length() == 0) {
        return true;
      }
      if (s.length() % 2 == 1) {
        return false;
      }
      int number=0;
      for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (c == '(') {
          number++;
        } else if (c == ')') {
          if (number==0) {
            return false;
          }
          number--;
        }
        
    }
    return number==0;
  }
}



