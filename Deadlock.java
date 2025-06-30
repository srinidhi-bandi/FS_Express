class A
{
   synchronized void foo(B b)
   {
      String name = Thread.currentThread().getName();
      System.out.println("The thread "+name+" has entered A class foo method");

	try { 
      Thread.sleep(1000); 
    } catch(InterruptedException e) { 
      System.out.println("Interrupted"); 
    } 

   }
}

class B
{
   synchronized void bar(A a)
   {
      String name = Thread.currentThread().getName();
      System.out.println("The thread "+name+" has entered  B class bar method");

	try { 
      Thread.sleep(1000); 
    } catch(InterruptedException e) { 
      System.out.println("Interrupted"); 
     }
   }
}

class Deadlock implements Runnable
{
   A a = new A();
   B b = new B();
   Thread t;

   Deadlock()
   {
      Thread.currentThread().setName("Main Thread");
      t = new Thread(this,"Racing Thread");
   }

   void deadlockStart()
   {
	t.start();
        a.foo(b);
   }

   public void run()
   { 
      b.bar(a);
   }
   public static void main(String args[])
   {
      Deadlock dl = new Deadlock();
      dl.deadlockStart();
   }
}