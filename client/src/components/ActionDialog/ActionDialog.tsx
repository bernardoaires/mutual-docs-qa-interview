import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

interface ActionDialogProps {
  title: string,
  description: string,
  actions: JSX.Element,
  open: boolean
}

export const ActionDialog: React.FC<ActionDialogProps> = (props) => {
  const { actions, description, title, open } = props

  return (
    <Dialog open={open}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color='GrayText'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  )
}