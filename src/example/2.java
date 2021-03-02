// 【题目扩展】给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。有效字符串需满足：
// 左括号必须用相同类型的右括号闭合
// 左括号必须以正确的顺序闭合
// 注意空字符串可被认为是有效字符串
// 请实现接口： public boolean isValid(String s)

import java.util.Stack;
class Q {
    public static void main(String[] args) {
        System.out.println("开始了----");
        System.out.println(isValid("(()))))"));
        System.out.println(isValid("{}"));
        System.out.println(isValid("[]"));
    }
    static boolean isValid(String s) {
        if(s==null||s.length()==0){
            return true;
        }
        if(s.length()%2==1){
            return false;
        }
        Stack<Character> stack=new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char a=s.charAt(i);
            if('('==a||'{'==a||'['==a){
                stack.push(a);
            }else if(')'==a){
                if(stack.empty()||stack.peek()!='('){
                    return false;
                }
                stack.pop();
            }else if('}'==a){
                if(stack.empty()||stack.peek()!='{'){
                    return false;
                }
                stack.pop();
            }else if(']'==a){
                if(stack.empty()||stack.peek()!='['){
                    return false;
                }
                stack.pop();
            }
        }
        return stack.isEmpty();
    }
}