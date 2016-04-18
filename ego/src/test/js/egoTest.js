describe("Ego", function(){
    beforeEach(function(){
        Field = Ego.Field;
        Creature = Ego.Creature;
    });

    it("should be defined", function(){
        expect(Ego).toBeDefined();
    });

    describe("should have a Field object", function(){
        it("defined", function(){
            expect(Field).toBeDefined();
        });

        describe("should have a interpolated field builder", function(){
            beforeEach(function(){
                interpolatedField = Field.interpolatedField;
            });

            it("defined", function(){
                expect(interpolatedField).toBeDefined();
            });

            it("should break if parameters are not point descriptions", function(){
                try{
                    interpolatedField(1, 1, ["a", 1, {}]);
                    expect(true).toBe(false);
                } catch(e){
                    expect(e).toBeDefined();
                    expect(e).toEqual("interpolatedField: 1 point does not have 'food' property. Point: a");
                }
            });

            describe("should have a point constructor", function(){
                beforeEach(function(){
                    Point = Field.Point;
                });

                it("defined", function(){
                    expect(Point).toBeDefined();

                    var temperature = 1;
                    var food = 2;
                    var rock = 3;

                    var p = new Point(temperature, food, rock);

                    expect(p.temperature).toBeDefined();
                    expect(p.temperature).toEqual(temperature);
                    expect(p.food).toBeDefined();
                    expect(p.food).toEqual(food);
                    expect(p.rock).toBeDefined();
                    expect(p.rock).toEqual(rock);
                });

                describe("should return a interpolated grid", function(){
                    beforeEach(function(){
                        var p1 = new Point(0,2,0);
                        var p2 = new Point(0,0,0);
                        var p3 = new Point(0,0,10);
                        var p4 = new Point(10,0,0);
                        field = interpolatedField(3, 3, [p1, p2, p3, p4]);
                    });

                    it("should have points defined", function(){
                        expect(field).toBeDefined();
                        var points = field.points;
                        expect(points).toBeDefined();
                        expect(_.size(points)).toEqual(3);
                        expect(_.size(points[0])).toEqual(3);
                        expect(_.size(points[1])).toEqual(3);
                        expect(_.size(points[2])).toEqual(3);

                        var c0 = points[0][0];
                        var c1 = points[0][1];
                        var c2 = points[0][2];
                        var c3 = points[1][0];
                        var c4 = points[1][1];
                        var c5 = points[1][2];
                        var c6 = points[2][0];
                        var c7 = points[2][1];
                        var c8 = points[2][2];

                        expect(c0).toBeDefined();
                        expect(c0).toEqual(new Point(0,2,0));

                        expect(c1).toBeDefined();
                        expect(c1).toEqual(new Point(0,1,0));

                        expect(c2).toBeDefined();
                        expect(c2).toEqual(new Point(0,0,0));

                        expect(c3).toBeDefined();
                        expect(c3).toEqual(new Point(5,1,0));

                        expect(c4).toBeDefined();
                        expect(c4).toEqual(new Point(2,0,2)); // values are rounded.

                        expect(c5).toBeDefined();
                        expect(c5).toEqual(new Point(0,0,5));

                        expect(c6).toBeDefined();
                        expect(c6).toEqual(new Point(10,0,0));

                        expect(c7).toBeDefined();
                        expect(c7).toEqual(new Point(5,0,5));

                        expect(c8).toBeDefined();
                        expect(c8).toEqual(new Point(0,0,10));

                    });

                    it("should have a 'seeFood' function", function(){
                        var seeFood = field.seeFood;
                        expect(seeFood).toBeDefined();
                        var food = seeFood(1,0);
                        expect(food).toBeDefined();
                        expect(food).toEqual(1);

                        field.points[1][0].food = 2;

                        food = seeFood(1,0);
                        expect(food).toBeDefined();
                        expect(food).toEqual(2);
                    });
                });
            });

        });
    });

    describe("should have a Creature object", function(){
        it("defined", function(){
            expect(Creature).toBeDefined();

            var id = 1;
            var name = "John";
            var health = 14;
            var age = 10000;
            var position = {x: 0, y:0};

            var c = new Creature(id, name, health, age, position);

            expect(c.id).toBeDefined();
            expect(c.id).toEqual(id)
            expect(c.name).toBeDefined();
            expect(c.name).toEqual(name);
            expect(c.health).toBeDefined();
            expect(c.health).toEqual(health);
            expect(c.age).toBeDefined();
            expect(c.age).toEqual(age);
            expect(c.position).toBeDefined();
            expect(c.position).toEqual(position);
        });

        it("should have a move function", function(){
            var c = new Creature();

            var move = c.move;

            expect(move).toBeDefined();
            expect(c.position).not.toBeDefined();
            move(1,2);
            expect(c.position).toEqual({x:1,y:2})
        });
    });


})
