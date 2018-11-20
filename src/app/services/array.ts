export function compareArray(a1: any[], a2: any[]): boolean {
    if (a1.length != a2.length) return false;

    for (let i in a1) {
        if (a1[i] != a2[i])
            return false;
    }
    return true;
}

export function rand(x): number {
    return Math.floor( Math.random() * x);
}

export function shuffleArray(a: any[]) {
    if (a.length <= 1) return;

    let item = a.splice(rand(a.length), 1);
    for (let i=0; i<(10*a.length); ++i) {
        item = a.splice(rand(a.length),1,item[0]);
    }
    a.splice(rand(a.length),0,item[0]);
}