let url: string = 'https://api.thecatapi.com/v1/images/search'
let button: HTMLButtonElement | null = document.querySelector('button')
let tableBody: HTMLTableElement | null = document.querySelector('#table-body')
interface CatType {
    id: string
    url: string
    height: number
    width: number
    test?: number
}
class Cat implements CatType {
    id: string
    url: string
    height: number
    width: number
    constructor(id: string, url: string, height: number, width: number) {
        this.id = id
        this.url = url
        this.height = height
        this.width = width
    }
}
class WebDisplay {
    // 加上pulic全局调用
    public static addData(data: CatType): void {
        const cat: Cat = new Cat(data.id, data.url, data.height, data.width)
        const tableRow: HTMLTableRowElement = document.createElement('tr')
        tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}" alt=""></td>
            <td>${cat.height.toString()}</td>
            <td>${cat.width.toString()}</td>
            <td>${cat.url}</td>
            <td><a href="#">X</a></td>
        `
        tableBody?.appendChild(tableRow)
    }
    public static deleteData(deleteButton: HTMLAnchorElement): void {
        const td = deleteButton.parentElement as HTMLTableCellElement
        const tr = td.parentElement as HTMLTableRowElement
        tr.remove()
    }
}

async function getJson<T>(url: string): Promise<T> {
    const response: Response = await fetch(url)
    const json: Promise<T> = await response.json()
    return json
}
async function getDate(): Promise<void> {
    try {
        const json: CatType[] = await getJson<CatType[]>(url)
        const data: CatType = json[0]
        WebDisplay.addData(data)
    } catch (e: Error | unknown) {
        let message: string
        if (e instanceof Error) {
            message = e.message
        } else {
            message = String(e)
        }
    }
}

button?.addEventListener<'click'>('click', getDate)
tableBody?.addEventListener<'click'>('click', (ev) => {
    WebDisplay.deleteData(<HTMLAnchorElement>ev.target)
})