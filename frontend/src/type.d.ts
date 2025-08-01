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
    onAiMessageComplete?:() => void; // 新增：AI消息完成时的回调
    onCreateDialog?:() => void;
}

declare interface CardHistory {
    id: string;
    description: string;
    sessionId: string;
}