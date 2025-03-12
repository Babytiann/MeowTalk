declare interface CardProps {
    sessionId: string;
    msg: string;
}

declare interface MsgBoxProps {
    msg: string;
    role: string;
}

declare interface InputSectionProps {
    sessionId: string;
    onSendMessage?:(newMessage: string) => void;
    onAiMessage?:(newMessage: string) => void;
    onCreateDialog?:() => void;
}