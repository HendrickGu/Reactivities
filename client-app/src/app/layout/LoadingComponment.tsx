import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted? : boolean;
    content? : string;
}

export default function LoadingComponment({inverted = true, content = 'Loading...'}:Props){
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />

        </Dimmer>
    )
}