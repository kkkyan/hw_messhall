package edu.graduate.messhall.bean;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="tblfood")
@Data
public class TblFood {
    @Id //是主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false , length = 11, columnDefinition = "无意义自增主键")
    public int foodId;

    @Column(nullable = false , length = 100, columnDefinition = "菜名")
    public String foodName;

    @Column(nullable = false , length = 11, columnDefinition = "价格")
    public int foodPrice;

    /*多对一映射，一个（商家用户多种菜）*/
    @ManyToOne(cascade = {CascadeType.REMOVE})
    @JoinColumn(name = "belongId",foreignKey = @ForeignKey(name = "tblfood_tbluser_userId_fk"))
    public TblUser belong;

    //@Column(nullable = false , length = 11, columnDefinition = "用户id")
    //public int belongId;

    public TblFood(String foodName, int foodPrice, TblUser belong){
        this.foodName = foodName;
        this.foodPrice = foodPrice;
        this.belong = belong;
    }

}
