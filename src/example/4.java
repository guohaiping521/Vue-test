// 【题目】一个整数数组 A，找到每个元素：右边第一个比我小的下标位置，没有则用 -1 表示。
// 输入：[5, 2]
// 输出：[1, -1]
// 解释：因为元素 5 的右边离我最近且比我小的位置应该是 A[1]，最后一个元素 2 右边没有比 2 小的元素，所以应该输出 -1。
// 接口：int[] findRightSmall(int[] A);

//数组右边第一个比我大
//数组左边第一个比我小
//数组左边第一个比我大
import java.util.Stack;

class B {
    public static void main(String[] args) {
        int[] A={5,2,3,0};
        for (int i = 0; i <findLeftSmall(A).length; i++) {
            System.out.println(findLeftSmall(A)[i]);
        }
    }
    static int[] findRightSmall(int[] array){
        int[] newArray=new int[array.length];
        Stack<Integer> stack= new Stack<Integer>();
        for (int i = 0; i < array.length; i++) {
            while (!stack.isEmpty()&&array[stack.peek()]>array[i]) {
                newArray[stack.peek()]=i;
                stack.pop();
            }
            stack.push(i);
        }
        while (!stack.isEmpty()) {
            newArray[stack.peek()]=-1;
            stack.pop();
        }
        return newArray;
  }
  static int[] findLeftSmall(int[] array){
    int[] newArray=new int[array.length];
    Stack<Integer> stack=new Stack<Integer>();
    for(int i = array.length-1; i >=0; i--) {
        while (!stack.isEmpty()&&array[stack.peek()]>array[i]) {
            newArray[stack.peek()]=i;
            stack.pop();
        }
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        newArray[stack.peek()]=-1;
        stack.pop();
    }
    return newArray;
  }
}





