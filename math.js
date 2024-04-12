export function GetAngle(p1, p2) {
    var angleDeg = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;
    return angleDeg;
};

export function GetAngleRadian(p1, p2) {
    return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
}
export function GetDistance(p1, p2) {
    var dist = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]))
    return dist
}


export function UpdatePositions(objects) {
    var objects_updated = [];
    objects.forEach(object => {
        var dF_x = object.Vector[0];
        var dF_y = object.Vector[1];

        var displ_x = dF_x / object.Mass;
        var displ_y = dF_y / object.Mass;

        object.Position =
            [
                object.Position[0] + displ_x,
                object.Position[1] + displ_y
            ];

        objects.forEach(objectInter => {
            if (object.Id === objectInter.Id)
                return;

            const angle = GetAngleRadian(object.Position, objectInter.Position);
            const distance = GetDistance(object.Position, objectInter.Position);
            if(distance === 0)
                distance = 0.01;
            
            const F = Math.sqrt((6.67 *objectInter.Mass) / (distance));

            const F_x = Math.cos(angle) * F;
            const F_y = Math.sin(angle) * F;

            dF_x += F_x;
            dF_y += F_y;
        })

        object.Vector = [dF_x,dF_y];
        objects_updated.push(object);
    });
    return objects_updated
}