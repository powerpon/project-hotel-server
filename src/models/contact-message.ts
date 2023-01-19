class ContactMessage{
    private id?: number;
    private name: string;
    private email: string;
    private message: string;

    public constructor(name: string, email: string, message: string) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getMessage(): string {
        return this.message;
    }

    public setId(id: number){
        this.id = id;
    }

    public setName(name: string){
        this.name = name;
    }

    public setEmail(email: string){
        this.email = email;
    }

    public setMessage(message: string){
        this.message = message;
    }
}

export default ContactMessage;